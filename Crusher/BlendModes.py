from PIL import Image
import numpy as np

class SIK_Blends:
    def subtract(imgInFloat : np.array, imgLayerFloat : np.array, opacity : float = 1.0) -> Image:
        """
        Subtracts imgLayer from imgIn and returns the result.
        """

        assert(opacity >= 0.0 and opacity <= 1.0)
        
        # convert to float
        imgLayerFloat *= opacity

        # subtract the images
        npImage = imgInFloat[:, :, :3] - imgLayerFloat[:,:,:3]
        
        # apply opacity
        npImage[npImage < 0.0] *= 0
        
        # convert the image back to a PIL image

        return npImage

    # compare the composite of all RGB channels, then darken based on lowest brightness
    #   TODO right now this is a Darken Color, we want Darker color blending mode.
    def darker_color(imgInFloat : np.array, imgLayerFloat : np.array, opacity : float = 1.0) -> Image:

        # convert to float ?is this needed?
        imgLayerFloat *= opacity

        # put both images into an array
        imageArr = np.array((imgInFloat[:, :, :3],imgLayerFloat[:,:,:3]))

        # get the darkest value from both arrays and put into return image
        npImage = np.minimum.reduce(imageArr)

        return npImage