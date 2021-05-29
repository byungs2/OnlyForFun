import numpy as np
import torch
import random
import cv2
BCEcls = torch.nn.BCEWithLogitsLoss(pos_weight=torch.tensor(1.0, device='cpu'))
pred = torch.tensor([0.5,0.5])
truth = torch.tensor([0.0,1.0])
print(BCEcls(pred, truth))
pred = np.concatenate((pred,truth))
print(pred)
pred = np.concatenate((pred,truth))
print(pred)
pred = np.concatenate((pred,truth))
print(pred)