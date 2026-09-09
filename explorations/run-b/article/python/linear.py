# microgpt.py lines 94-95
def linear(x, w):
    return [sum(wi * xi for wi, xi in zip(wo, x)) for wo in w]
