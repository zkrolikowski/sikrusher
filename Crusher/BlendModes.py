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