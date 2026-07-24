import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../shadcn/dialog';

import { Button } from '../shadcn/button';

type QuestionDialogProps = {
  open: boolean;
  title: string;
  message: string;

  onOk: () => void;
  onCancel: () => void;

  okText?: string;
  cancelText?: string;
};

export const OkCancelDialog = ({
  open,
  title,
  message,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
}: QuestionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant='outline' onClick={onCancel}>
            {cancelText}
          </Button>

          <Button onClick={onOk}>{okText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
