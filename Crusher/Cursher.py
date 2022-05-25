#!
from PIL import Image                       # Image processeing
import argparse                             # Command line arguments
from BlendModes import SIK_Blends as blends # blend modes
import blend_modes as bm                    # for testing

# Command line arguments
parser = argparse.ArgumentParser(description='Crush an image')
parser.add_argument('-i', '--image', help='Image to crush', required=True)
parser.add_argument('-c', '--crusher', help='Image to crush with', required=True)
args = parser.parse_args()


# load and show image
with Image.open(args.image) as image:
    with Image.open(args.crusher) as crusher:

        # subtract the images
        crusher = crusher.resize(image.size)

        newImage = blends.subtract(image, crusher, 1.0)
        
        newImage.show()
