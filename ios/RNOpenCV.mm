#import "RNOpenCV.h"
#import <React/RCTLog.h>
#import <UIKit/UIImage.h>
#import <opencv2/highgui/highgui_c.h>
#import <opencv2/imgcodecs/ios.h>
#import <vector>

@implementation RNOpenCV

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(
    crop:(NSDictionary *)points 
    imageUri:(NSString *)base64String 
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
{
  @try {
    CIImage *ciImage = [self decodeBase64ToCIImage: base64String];
    UIImage *uiImage = [self decodeBase64ToImage: base64String];

    CGPoint newLeft = CGPointMake([points[@"topLeft"][@"x"] floatValue], [points[@"topLeft"][@"y"] floatValue]);
    CGPoint newRight = CGPointMake([points[@"topRight"][@"x"] floatValue], [points[@"topRight"][@"y"] floatValue]);
    CGPoint newBottomLeft = CGPointMake([points[@"bottomLeft"][@"x"] floatValue], [points[@"bottomLeft"][@"y"] floatValue]);
    CGPoint newBottomRight = CGPointMake([points[@"bottomRight"][@"x"] floatValue], [points[@"bottomRight"][@"y"] floatValue]);

    newLeft = [self cartesianForPoint:newLeft height:uiImage.size.height];
    newRight = [self cartesianForPoint:newRight height:uiImage.size.height];
    newBottomLeft = [self cartesianForPoint:newBottomLeft height:uiImage.size.height];
    newBottomRight = [self cartesianForPoint:newBottomRight height:uiImage.size.height];
    
    
    NSMutableDictionary *rectangleCoordinates = [[NSMutableDictionary alloc] init];
    
    rectangleCoordinates[@"inputTopLeft"] = [CIVector vectorWithCGPoint:newLeft];
    rectangleCoordinates[@"inputTopRight"] = [CIVector vectorWithCGPoint:newRight];
    rectangleCoordinates[@"inputBottomLeft"] = [CIVector vectorWithCGPoint:newBottomLeft];
    rectangleCoordinates[@"inputBottomRight"] = [CIVector vectorWithCGPoint:newBottomRight];
    
    ciImage = [ciImage imageByApplyingFilter:@"CIPerspectiveCorrection" withInputParameters:rectangleCoordinates];
    
    CIContext *context = [CIContext contextWithOptions:nil];
    CGImageRef cgimage = [context createCGImage:ciImage fromRect:[ciImage extent]];
    UIImage *image = [UIImage imageWithCGImage:cgimage];
    
    NSData *imageToEncode = UIImageJPEGRepresentation(image, 0.8);
    NSString *base64Data = [imageToEncode base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    resolve(base64Data);
  } @catch (NSException *exception) {
    NSError *error;
    reject(@"error", exception.reason, error);
  }
}

RCT_EXPORT_METHOD(
    grayScale:(NSString *)base64String
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject
)
{
  @try {
    UIImage *uiImage = [self decodeBase64ToImage: base64String];

    // Start processing

    cv::Mat imageMat;
    cv::Mat grayMat;
    UIImageToMat(uiImage, imageMat);
    cv::cvtColor(imageMat, grayMat, cv::COLOR_BGR2GRAY);
    // End processing
    UIImage *grayeditImage = MatToUIImage(grayMat);
    grayMat.release();
    imageMat.release();

    NSString *base64Data = [self imageToNSString:grayeditImage];

    // Return the new grayscale image
    resolve(base64Data);
  } @catch (NSException *exception) {
    NSError *error;
    reject(@"error", exception.reason, error);
  }
}

RCT_EXPORT_METHOD(blackAndWhite
                  : (NSString *)imageAsBase64 resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  @try {
    UIImage *image = [self decodeBase64ToImage:imageAsBase64];

    cv::Mat imageMat;
    cv::Mat grayMat;
    UIImageToMat(image, imageMat);
    cv::cvtColor(imageMat, grayMat, cv::COLOR_BGR2GRAY);
    cv::adaptiveThreshold(grayMat, grayMat, 255, cv::ADAPTIVE_THRESH_MEAN_C, cv::THRESH_BINARY, 11, 7);
    cv::GaussianBlur(grayMat, grayMat, cv::Size(1,1), 50.0);

    UIImage *grayeditImage = MatToUIImage(grayMat);

    grayMat.release();
    imageMat.release();

    NSString *base64 = [self imageToNSString:grayeditImage];
    resolve(base64);
  } @catch (NSException *exception) {
    NSError *error;
    reject(@"error", exception.reason, error);
  }
}

// native code
- (NSString *)imageToNSString:(UIImage *)image {
  NSData *imageData = UIImagePNGRepresentation(image);

  return [imageData
      base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
}

- (UIImage *)decodeBase64ToImage:(NSString *)strEncodeData {
  NSData *data = [[NSData alloc]
      initWithBase64EncodedString:strEncodeData
                          options:NSDataBase64DecodingIgnoreUnknownCharacters];
  return [UIImage imageWithData:data];
}

- (CIImage *)decodeBase64ToCIImage:(NSString *)strEncodeData {
  NSData *data = [[NSData alloc]
      initWithBase64EncodedString:strEncodeData
                          options:NSDataBase64DecodingIgnoreUnknownCharacters];
  return [CIImage imageWithData:data];
}

- (CGPoint)cartesianForPoint:(CGPoint)point height:(float)height {
    
    return CGPointMake(point.x, height - point.y);
}


@end
