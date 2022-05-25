from PIL import Image    # Image processeing
import argparse          # Command line arguments
import numpy as np       # subtracting images
import blend_modes as bm # blend modes

# Command line arguments
parser = argparse.ArgumentParser(description='Crush an image')
parser.add_argument('-i', '--image', help='Image to crush', required=True)
parser.add_argument('-c', '--crusher', help='Image to crush with', required=True)
args = parser.parse_args()


# load and show image
with Image.open(args.image) as image:
    with Image.open(args.crusher) as crusher:
        
        crusher = crusher.resize(image.size)

        # subtract the crusher from the image
        npImage = np.array(image)
        npCrusher = np.array(crusher)


        npImageFloat = npImage.astype(np.float32)
        npCrusherFloat = npCrusher.astype(np.float32)


        npImage = bm.difference(npCrusherFloat, npImageFloat, opacity = 0.3)

        # convert the image back to a PIL image
        npImage = npImage.astype(np.uint8)
        newImage = Image.fromarray(npImage)
        newImage.show()