import { IconCalendarCheck, IconCheck, IconEdit, IconKey, IconMail, IconUserCircle, IconWorld, IconX } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { AnimatePresence, motion } from "framer-motion"
import { FC } from "react"
import Strength from "../../helpers/strentgh"
import { usePassphrasesSlice } from "../../stores/passphrases"
import FancyInput from "../form/FancyInput"

const PassphraseDetails: FC = () => {
  const passphrases = usePassphrasesSlice((state) => state.passphrases)
  const selectedPassphrase = usePassphrasesSlice((state) => state.selectedPassphrase)
  const detailsVisible = usePassphrasesSlice((state) => state.detailsVisible)
  const closeDetails = usePassphrasesSlice((state) => state.closeDetails)

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
            hidden: { opacity: 0, y: "2rem" },
            visible: { opacity: 1, transition: { delay: 0.15, }, y: 0 }
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-tuatara-50 dark:bg-tuatara-950 rounded-lg h-full w-full relative max-w-screen-sm"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="h-24 pl-40 p-2 bg-tuatara-100 dark:bg-tuatara-900 rounded-t-lg flex items-end gap-4 relative">
            <button
              className="absolute top-4 right-4 hover:bg-tuatara-200 dark:hover:bg-tuatara-800 p-2 hover:rounded-3xl hover:text-red-500 hover:rotate-90 transition-all duration-300"
              onClick={closeDetails}
            >
              <IconX />
            </button>

            <img
              src={`https://logo.clearbit.com/${passphrases[selectedPassphrase].platform.toLowerCase()}.com`}
              alt={passphrases[selectedPassphrase].platform}
              width={128}
              height={128}
              className="rounded-full absolute -bottom-12 left-4"
            />

            <div>
              <h1 className="text-2xl font-medium text-tuatara-900 dark:text-tuatara-50">
                {passphrases[selectedPassphrase].platform}
              </h1>

              <span className="block text-tuatara-500 text-sm">
                <a
                  href={passphrases[selectedPassphrase].url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {passphrases[selectedPassphrase].url}
                </a>
              </span>
            </div>
          </div>

          <div className="mt-12 p-4">
            <Formik
              initialValues={{
                email: passphrases[selectedPassphrase].email || "",
                username: passphrases[selectedPassphrase].username || "",
                url: passphrases[selectedPassphrase].url || "",
                password: ""
              }}
              enableReinitialize
              onSubmit={() => { }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) =>
                <Form className="grid grid-cols-1 gap-4">
                  {[{
                    label: "Email",
                    value: values.email,
                    icon: <IconMail />,
                    name: "email",
                    type: "email",
                  }, {
                    label: "Username",
                    value: values.username,
                    icon: <IconUserCircle />,
                    name: "username",
                    type: "text",
                  }, {
                    label: "URL",
                    value: values.url,
                    icon: <IconWorld />,
                    name: "url",
                    type: "url",
                  }].map((field, index) =>
                    <FancyInput
                      key={index}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      label={field.label}
                      icon={field.icon}
                      name={field.name}
                      type={field.type}
                      value={field.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}

                  <FancyInput
                    label="Password"
                    icon={<IconKey />}
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div>
                    <strong>{Strength.calculate(values.password)}</strong>

                    {Object.entries(Strength.evaluate(values.password)).map(([key, value], index) =>
                      <div key={index} className="flex items-center gap-4">
                        {!key.includes("No")
                          ? value
                            ? <IconCheck className="stroke-green-500" />
                            : <IconX className="stroke-red-500" />
                          : value
                            ? <IconX className="stroke-red-500" />
                            : <IconCheck className="stroke-green-500" />
                        }

                        <span>{key}</span>
                      </div>)}
                  </div>

                </Form>
              }
            </Formik>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <FancyInput
                label="Created At"
                icon={<IconCalendarCheck />}
                value={new Date(passphrases[selectedPassphrase].createdAt)
                  .toLocaleString("en-UK", {
                    hour12: false,
                    dateStyle: "medium",
                    timeStyle: "short"
                  })
                }
                readOnly
              />

              <FancyInput
                label="Updated At"
                icon={<IconEdit />}
                value={new Date(passphrases[selectedPassphrase].updatedAt)
                  .toLocaleString("en-UK", {
                    hour12: false,
                    dateStyle: "medium",
                    timeStyle: "short"
                  })
                }
                readOnly
              />
            </div>
          </div>
        </motion.aside>
      </motion.section>
    }
  </AnimatePresence>
}

export default PassphraseDetails
