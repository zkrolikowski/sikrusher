from PIL import Image
import numpy as np

class SIK_Blends:
    def subtract(imgIn : Image, imgLayer : Image, opacity : float = 1.0) -> Image:
        """
        Subtracts imgLayer from imgIn and returns the result.
        """
        # convert to float
        imgInFloat = np.array(imgIn).astype(np.float32)
        imgLayerFloat = np.array(imgLayer).astype(np.float32)

        imgLayerFloat *= opacity

        # subtract the images
        npImage = imgInFloat[:, :, :3] - imgLayerFloat[:,:,:3]
        
        # apply opacity
        npImage[npImage < 0.0] *= 0
        
        # convert the image back to a PIL image
        npImage = npImage.astype(np.uint8)
        newImage = Image.fromarray(npImage)
        
        return newImage