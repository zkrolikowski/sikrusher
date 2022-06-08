##################################################
## Crusher
## A basic tool to apply image processing effects 
## to images.
##################################################
## MIT
##################################################
## Author: Zack Krolikowski and Eli Alvarado and Kenny Chau
## Copyright: Copyright 2022, sikrusher
## Credits: [TODO]
## License: MIT
## Version: 0.0.1
## Mmaintainer: Zack Krolikowski
## Email: TODO
## Status: Protype
##################################################

from PIL import Image, ImageEnhance         # Image processeing
import argparse                             # Command line arguments
from BlendModes import SIK_Blends as blends # blend modes
import blend_modes as bm                    # for testing
import numpy as np                          # for image processing

# Command line arguments
parser = argparse.ArgumentParser(description='Crush an image')
parser.add_argument('-i', '--image', help='Image to crush', required=True)
parser.add_argument('-o', '--output', help='Output file', required=False)
parser.add_argument('-c', '--crusher', help='Image to crush with', required=True, nargs=argparse.ONE_OR_MORE)
parser.add_argument('-s', '--show', help='Blend mode', required=False, type=bool, default=False, nargs=argparse.ONE_OR_MORE)
parser.add_argument('-op',  '--opacity', help='Opacity', required=False, type=float, default=1.0, nargs=argparse.ONE_OR_MORE)
parser.add_argument('-co', '--contrast', help='Contrast', required=False, type=float, default=1.0, nargs=argparse.ONE_OR_MORE)
parser.add_argument('-l', '--layers', help='layers', required=False, type=int, default=-1)

args = parser.parse_args()

crushers = ["Crushers/crusher1.png", "Crushers/crusher2.png", "Crushers/crusher3.png", "Crushers/crusher4.png"]
opacitys = [1.0, 0.5, 0.5, 0.25]
contrasts = [1.0, 1.0, 1.0, 1.0]
layers = 4

if(args.layers != -1):
    layers = args.layer
    crusher = args.crusher
    opacitys = args.opacity
    contrasts = args.contrast


# base image to modify
with Image.open(args.image) as image:
    imgInFloat = np.array(image).astype(np.float32)
    
    # for each layer apply effects
    for i in range(layers):
        with Image.open(crushers[i]) as crusher:
            
            # Resize to match input size
            crusher = crusher.resize(image.size)
            
            # apply contrast
            if(contrasts[i] != 1.0):
                enhancer = ImageEnhance.Contrast(crusher)
                crusher = enhancer.enhance(contrasts[i])

            # convert to np array    
            imgLayerFloat = np.array(crusher).astype(np.float32)

            # subtract the images
            # imgInFloat = blends.subtract(imgInFloat, imgLayerFloat, opacitys[i])
            imgInFloat = blends.darker_color(imgInFloat, imgLayerFloat, opacitys[i])
        
        if args.show:
            imgInFloat = imgInFloat.astype(np.uint8)
            image = Image.fromarray(imgInFloat)
        
            image.show()

    if args.output:
        imgInFloat = imgInFloat.astype(np.uint8)
        image = Image.fromarray(imgInFloat)
        
        image.save(args.output)