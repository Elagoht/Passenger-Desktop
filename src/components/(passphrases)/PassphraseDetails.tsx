import { IconCalendarCheck, IconCheck, IconDeviceFloppy, IconEdit, IconExternalLink, IconKey, IconMail, IconUserCircle, IconWorld, IconX } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { AnimatePresence, motion } from "framer-motion"
import { FC } from "react"
import Strength from "../../helpers/strength"
import { usePassphrasesSlice } from "../../stores/passphrases"
import FancyInput from "../form/FancyInput"
import FancyTextArea from "../form/FancyTextArea"
import Meter from "../common/Meter"
import FormikHelper from "../../helpers/formik"

const PassphraseDetails: FC = () => {
  const selectedPassphrase = usePassphrasesSlice((state) => state.selectedPassphrase)
  const detailsVisible = usePassphrasesSlice((state) => state.detailsVisible)
  const closeDetails = usePassphrasesSlice((state) => state.closeDetails)

  return <AnimatePresence>
    {selectedPassphrase !== null && detailsVisible &&
      <Formik
        initialValues={{
          email: selectedPassphrase?.email || "",
          username: selectedPassphrase?.username || "",
          url: selectedPassphrase?.url || "",
          password: "",
          notes: selectedPassphrase?.notes || "",
        }}
        enableReinitialize
        onSubmit={() => { }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          initialValues
        }) =>
          <Form className="grid grid-cols-1 gap-1 relative">
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
                className="bg-tuatara-50 dark:bg-tuatara-950 rounded-lg h-full w-full relative max-w-screen-sm overflow-y-auto"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="h-24 pl-36 p-2 bg-tuatara-100 dark:bg-tuatara-900 rounded-t-lg flex items-end gap-4 relative">
                  <button
                    className="absolute top-4 right-4 hover:bg-tuatara-200 dark:hover:bg-tuatara-800 p-2 hover:rounded-3xl hover:text-red-500 hover:rotate-90 transition-all duration-300"
                    onClick={closeDetails}
                  >
                    <IconX />
                  </button>

                  <img
                    src={`https://logo.clearbit.com/${selectedPassphrase.platform.toLowerCase()}.com`}
                    alt={selectedPassphrase.platform}
                    width={128}
                    height={128}
                    className="rounded-full absolute -bottom-12 left-4"
                  />

                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-medium text-tuatara-900 dark:text-tuatara-50">
                      {selectedPassphrase.platform}
                    </h1>
                    <a
                      href={selectedPassphrase.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconExternalLink className="stroke-tuatara-500 hover:stroke-tuatara-400" />
                    </a>
                  </div>
                </div>

                <div className="mt-12 p-4">
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
                    type="password"
                    placeholder="Enter password"
                    icon={<IconKey />}
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Meter percentage={
                    Strength.calculate(values.password) * 100 / 8
                  } />

                  <div className="my-4">
                    <strong className="text-lg">
                      {Strength.calculatedMessage(
                        Strength.calculate(values.password)
                      )}
                    </strong>

                    {Object.entries(Strength.evaluate(values.password)).map(([key, value], index) =>
                      <div key={index} className="flex items-center gap-2">
                        {!key.includes("No")
                          ? value
                            ? <IconCheck className="stroke-green-500" />
                            : <IconX className="stroke-red-500" />
                          : value
                            ? <IconX className="stroke-red-500" />
                            : <IconCheck className="stroke-green-500" />
                        }

                        <span>{key}</span>
                      </div>
                    )}
                  </div>

                  <FancyTextArea
                    label="Notes"
                    placeholder="Enter notes"
                    icon={<IconEdit />}
                    value={values.notes}
                    name="notes"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FancyInput
                      label="Created At"
                      icon={<IconCalendarCheck />}
                      value={new Date(selectedPassphrase.createdAt)
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
                      value={new Date(selectedPassphrase.updatedAt)
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


            {FormikHelper.isEdited(initialValues, values) &&
              <motion.button
                variants={{
                  hidden: { opacity: 0, rotate: 360, scale: 0, transition: { ease: "easeInOut", duration: 0 } },
                  visible: { opacity: 1, rotate: 0, scale: 1, transition: { ease: "easeInOut", duration: 0 } },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                type="submit"
                className="bg-leaf-400 dark:bg-leaf-600 text-white p-3 rounded-full hover:bg-leaf-500 dark:hover:bg-leaf-500 transition-all duration-300 fixed bottom-8 right-8 z-50 cursor-pointer"
              >
                <IconDeviceFloppy size={36} stroke={1.5} />
              </motion.button>
            }
          </Form>
        }
      </Formik>
    }
  </AnimatePresence>
}

export default PassphraseDetails
