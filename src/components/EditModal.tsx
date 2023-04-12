import { Fragment, useRef, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from 'fabric';
import { api as uploadAPI } from '@/server/upload';
import Spinner from './Spinner';

const IMAGE_WIDTH = 720;
const IMAGE_HEIGHT = 480;

export default function EditModal({ 
  isOpen, 
  onClose,
  url,
}: { 
  isOpen: boolean, 
  onClose: (url?: string) => void,
  url: string,
}) {
  const { editor, onReady } = useFabricJSEditor();
  const [imageFlag, setImageFlag] = useState(false);
  const [saving, setSaving] = useState(false);
  const cancelButtonRef = useRef(null);
  const imageRef = useRef<fabric.Image>();

  const handleInit = (canvas: fabric.Canvas) => {
    onReady(canvas);
    canvas.setWidth(IMAGE_WIDTH);
    canvas.setHeight(IMAGE_HEIGHT);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "rgb(255, 255, 255)";
  };

  useEffect(() => {
    if (isOpen) {
      fabric.Image.fromURL(url, (image) => {
        image.scaleToWidth(IMAGE_WIDTH);
        image.scaleToHeight(IMAGE_HEIGHT);
        imageRef.current = image;
        setImageFlag(true);
      }, {
        crossOrigin: 'anonymous'
      });
    }
  }, [isOpen, url]);

  useEffect(() => {
    if (imageFlag && editor && imageRef.current) {
      editor.canvas.add(imageRef.current);
      setImageFlag(false);
    }
  }, [imageFlag, editor]);

  const handleSave = async () => {
    setSaving(true);
    editor?.canvas.getElement().toBlob(async (blob) => {
      if (!blob) return;
      const { fileUrl } = await uploadAPI.uploadFile(blob);
      setSaving(false);
      onClose(fileUrl);
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => onClose()} unmount={false}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Edit
                      </Dialog.Title>
                      <div className="mt-4 flex justify-center">
                        <FabricJSCanvas onReady={handleInit} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto items-center disabled:bg-red-500"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving && <Spinner />}
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onClose()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
