"use client";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { useSession } from "next-auth/react";
import TweetComposer from "../common/TweetComposer";

function TweetComposerDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-light-gray" />
        </TransitionChild>

        <div className="fixed inset-0 h-screen w-full overflow-y-auto">
          <div className="flex h-full items-start justify-center text-center xs:p-10">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* Dialog box  */}
              <DialogPanel
                className="flex h-full w-full max-w-screen-sm transform flex-col gap-3 overflow-hidden bg-black pl-2 text-left align-middle shadow-xl transition-all xs:h-fit xs:max-h-[90vh] xs:rounded-2xl"
                as="div"
              >
                <div className="h-full overflow-auto">
                  {/* Close button */}
                  <div className="sticky top-0 z-[10] flex items-center bg-black/50 p-2 backdrop-blur-sm">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center rounded-full p-3 hover:bg-white/10"
                    >
                      <AiOutlineClose className="h-6 w-6 fill-white" />
                    </button>
                    <div className="ml-2 flex-1 text-white">
                      <span>Tweet</span>
                    </div>
                  </div>
                  <div className="h-full">
                    <TweetComposer
                      session={session}
                      id="Tweetcomposer-dialog-file-input"
                    />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default TweetComposerDialog;
