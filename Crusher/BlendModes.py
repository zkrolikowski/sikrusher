from PIL import Image
import numpy as np

class SIK_Blends:
    def subtract(imgInFloat : np.array, imgLayerFloat : np.array, opacity : float = 1.0) -> np.array:
        """
        Subtracts imgLayer from imgIn and returns the result.
        """

        assert(opacity >= 0.0 and opacity <= 1.0)
        
        # convert to float
        imgLayerFloat *= opacity

        # subtract the images
        npImage = imgInFloat[:, :, :3] - imgLayerFloat[:,:,:3]
        
        # remove negative values
        npImage[npImage < 0.0] *= 0
        
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

    #multiply the RGB channels of the two images
    def antcolony(imgInFloat : np.array, imgLayerFloat : np.array, opacity : float = 1.0) -> np.array:
        """
        square both and subtracts
        """

        assert(opacity >= 0.0 and opacity <= 1.0)
        
        # convert to float
        imgLayerFloat *= opacity

        # square the images then subtract rbg channels
        npImage = imgInFloat[:, :, :3]**2 - imgLayerFloat[:,:,:3]**2

        return npImage

    # start with base image then scale image up but dont add pixels, leave blank space and keep layer over each other
    def shear (imgInFloat : np.array, imgLayerFloat : np.array, opacity : float = 1.0) -> np.array:
        """
        Multiplies imgLayer by imgIn and returns the result.
        """

        assert(opacity >= 0.0 and opacity <= 1.0)
        
        # convert to float
        imgLayerFloat *= opacity

        # Todo
        #return npImage