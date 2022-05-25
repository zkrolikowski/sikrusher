##################################################
## Crusher
## A basic tool to apply image processing effects 
## to images.
##################################################
## MIT
##################################################
## Author: Zack Krolikowski and Eli Alvarado
## Copyright: Copyright 2022, sikrusher
## Credits: [TODO]
## License: MIT
## Version: 0.0.1
## Mmaintainer: Zack Krolikowski
## Email: TODO
## Status: Protype
##################################################

from PIL import Image                       # Image processeing
import argparse                             # Command line arguments
from BlendModes import SIK_Blends as blends # blend modes
import blend_modes as bm                    # for testing


# Command line arguments
parser = argparse.ArgumentParser(description='Crush an image')
parser.add_argument('-i', '--image', help='Image to crush', required=True)
parser.add_argument('-c', '--crusher', help='Image to crush with', required=True)
parser.add_argument('-o', '--output', help='Output file', required=False)
parser.add_argument('-s', '--show', help='Blend mode', required=False)
args = parser.parse_args()

with Image.open(args.image) as image:
    with Image.open(args.crusher) as crusher:

        # subtract the images
        crusher = crusher.resize(image.size)

        newImage = blends.subtract(image, crusher, 1.0)
        
        if args.show:
            newImage.show()
        
        if args.output:
            newImage.save(args.output)
