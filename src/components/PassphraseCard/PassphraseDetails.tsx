import { IconX } from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"
import { FC } from "react"
import { usePassphrasesSlice } from "../../stores/passphrases"

const PassphraseDetails: FC = () => {
  const passphrases = usePassphrasesSlice((state) => state.passphrases)
  const selectedPassphrase = usePassphrasesSlice((state) => state.selectedPassphrase)
  const detailsVisible = usePassphrasesSlice((state) => state.detailsVisible)
  const closeDetails = usePassphrasesSlice((state) => state.closeDetails)

  const { platform, url } = passphrases[selectedPassphrase] || {}

  return <AnimatePresence>
    {selectedPassphrase > -1 && detailsVisible &&
      <motion.section
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
        onClick={closeDetails}
      >
        <motion.aside
          variants={{
            hidden: {
              opacity: 0,
              y: "2rem"
            },
            visible: {
              opacity: 1,
              transition: { delay: 0.15, },
              y: 0
            }
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-tuatara-50 dark:bg-tuatara-950 rounded-lg h-full w-full relative max-w-screen-sm"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="h-24 pl-40 p-2 bg-tuatara-100 dark:bg-tuatara-900 rounded-t-lg flex items-end gap-4 relative">
            <img
              src={`https://logo.clearbit.com/${platform.toLowerCase()}.com`}
              alt={platform}
              width={128}
              height={128}
              className="rounded-full absolute -bottom-12 left-4"
            />

            <div>
              <h1 className="text-2xl font-medium text-tuatara-900 dark:text-tuatara-50">
                {platform}
              </h1>

              <span className="block text-tuatara-500 text-sm">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {url}
                </a>
              </span>
            </div>
          </div>

          <button
            className="absolute top-4 right-4 hover:bg-tuatara-200 dark:hover:bg-tuatara-800 p-2 hover:rounded-3xl hover:text-red-500 hover:rotate-90 transition-all duration-300"
            onClick={closeDetails}
          >
            <IconX />
          </button>
        </motion.aside>
      </motion.section>
    }
  </AnimatePresence>
}

export default PassphraseDetails
