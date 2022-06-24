
// @author Adam G. Freeman - adamgf@gmail.com
package com.adamfreeman.rnocv3;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Promise;

import org.opencv.android.InstallCallbackInterface;
import org.opencv.android.BaseLoaderCallback;
import org.opencv.android.OpenCVLoader;
import org.opencv.android.LoaderCallbackInterface;
import org.opencv.android.Utils;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfInt;
import org.opencv.core.MatOfPoint;
import org.opencv.core.MatOfPoint2f;
import org.opencv.core.Point;
import org.opencv.imgcodecs.*;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import org.opencv.calib3d.Calib3d;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public class RNOpenCVModule extends ReactContextBaseJavaModule {

    private static final String TAG = RNOpenCVModule.class.getSimpleName();

    static {
        System.loadLibrary("opencv_java3");
    }

    private ReactApplicationContext reactContext;

    public RNOpenCVModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNOpenCV";
    }

    @ReactMethod
    public void crop(ReadableMap points, String base64String, Promise promise) {
        try {

            Point tl = new Point(points.getMap("topLeft").getDouble("x"), points.getMap("topLeft").getDouble("y"));
            Point tr = new Point(points.getMap("topRight").getDouble("x"), points.getMap("topRight").getDouble("y"));
            Point bl = new Point(points.getMap("bottomLeft").getDouble("x"),
                    points.getMap("bottomLeft").getDouble("y"));
            Point br = new Point(points.getMap("bottomRight").getDouble("x"),
                    points.getMap("bottomRight").getDouble("y"));

            Mat originalImageMat = imageBase64ToMat(base64String);

            Mat transformedImageMat = new Mat();

            Mat cropPointsMat = new Mat(4, 1, CvType.CV_32FC2);
            Mat toPointsMat = new Mat(4, 1, CvType.CV_32FC2);

            cropPointsMat.put(0, 0, tl.x, tl.y, tr.x, tr.y, br.x, br.y,
                    bl.x,
                    bl.y);
            toPointsMat.put(0, 0, 0.0, 0.0, originalImageMat.cols(), 0.0, originalImageMat.cols(),
                    originalImageMat.rows(),
                    0.0, originalImageMat.rows());

            Mat m = Imgproc.getPerspectiveTransform(cropPointsMat, toPointsMat);
            Size dsize = new Size(originalImageMat.cols(), originalImageMat.rows());
            Imgproc.warpPerspective(originalImageMat, transformedImageMat, m, dsize);

            Bitmap bitmap = Bitmap.createBitmap(transformedImageMat.cols(), transformedImageMat.rows(),
                    Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(transformedImageMat, bitmap);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.JPEG, 70, byteArrayOutputStream);
            byte[] byteArray = byteArrayOutputStream.toByteArray();

            String base64Result = Base64.encodeToString(byteArray, Base64.DEFAULT);
            m.release();
            promise.resolve(base64Result);

        } catch (Exception e) {
            Log.e(TAG, e.getMessage(), e);
            promise.reject(e);
        }

    }

    @ReactMethod
    public void grayScale(String base64String, Promise promise) {
        try {

            Mat originalImageMat = imageBase64ToMat(base64String);

            Mat transformedImageMat = new Mat(originalImageMat.rows(), originalImageMat.cols(), CvType.CV_32FC2);
            Imgproc.cvtColor(originalImageMat, transformedImageMat, Imgproc.COLOR_RGB2GRAY);

            Bitmap bitmap = Bitmap.createBitmap(transformedImageMat.cols(), transformedImageMat.rows(),
                    Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(transformedImageMat, bitmap);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.JPEG, 70, byteArrayOutputStream);
            byte[] byteArray = byteArrayOutputStream.toByteArray();

            String base64Result = Base64.encodeToString(byteArray, Base64.DEFAULT);
            promise.resolve(base64Result);
        } catch (Exception e) {
            Log.e(TAG, e.getMessage(), e);
            promise.reject(e);
        }
    }

    @ReactMethod
    public void blackAndWhite(String base64String, Promise promise) {
        try {

            // Initializing mats
            Mat originalImageMat = imageBase64ToMat(base64String);
            Mat transformedImageMat = new Mat(originalImageMat.rows(), originalImageMat.cols(), CvType.CV_32FC2);

            // Applying simple threshold
            Imgproc.cvtColor(originalImageMat, originalImageMat, Imgproc.COLOR_RGB2GRAY);
            Imgproc.adaptiveThreshold(originalImageMat, transformedImageMat, 255,
                    Imgproc.ADAPTIVE_THRESH_MEAN_C,
                    Imgproc.THRESH_BINARY, 15, 40);

            // Converting to base64
            Bitmap bitmap = Bitmap.createBitmap(transformedImageMat.cols(), transformedImageMat.rows(),
                    Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(transformedImageMat, bitmap);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.JPEG, 70, byteArrayOutputStream);
            byte[] byteArray = byteArrayOutputStream.toByteArray();

            // WritableMap map = Arguments.createMap();
            // map.putString("path", Base64.encodeToString(byteArray, Base64.DEFAULT));
            String base64Result = Base64.encodeToString(byteArray, Base64.DEFAULT);
            promise.resolve(base64Result);
        } catch (Exception e) {
            Log.e(TAG, e.getMessage(), e);
            promise.reject(e);
        }
    }

    public Mat imageBase64ToMat(String imageAsBase64) {
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inDither = true;
        options.inPreferredConfig = Bitmap.Config.ARGB_8888;

        byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
        Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
        Mat matImage = new Mat();
        Utils.bitmapToMat(image, matImage);

        return matImage;
    }

}
