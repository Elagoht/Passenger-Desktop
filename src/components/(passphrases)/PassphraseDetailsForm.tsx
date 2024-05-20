import { IconCalendarCheck, IconDeviceFloppy, IconEdit, IconKey, IconMail, IconWorld } from "@tabler/icons-react"
import { Form, Formik } from "formik"
import { motion } from "framer-motion"
import { FC } from "react"
import FormikHelper from "../../helpers/formik"
import Strength from "../../helpers/strength"
import { Passphrase } from "../../types/common"
import FancyInput from "../form/FancyInput"
import FancyTextArea from "../form/FancyTextArea"
import Meter from "../statistics/Meter"

type IPassphraseDetailsFormProps = Passphrase

const PassphraseDetailsForm: FC<IPassphraseDetailsFormProps> = ({
  identity, url, notes
}) => <Formik
  initialValues={{
    identity: identity || "",
    url: url || "",
    password: "",
    notes: notes || "",
  }}
  onSubmit={() => { }}
>
    {({
      values,
      handleChange,
      handleBlur,
      initialValues
    }) =>
      <Form className="grid grid-cols-1 gap-1 relative p-2">
        {[{
          label: "Identity",
          value: values.identity,
          icon: <IconMail />,
          name: "identity",
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
            placeholder={field.label}
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

        <Meter percentage={Strength.calculate(values.password) * 100 / 8} />

        <FancyTextArea
          label="Notes"
          placeholder="Enter notes"
          icon={<IconEdit />}
          value={values.notes}
          name="notes"
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="grid md:grid-cols-2 gap-2">
          <FancyInput
            readOnly
            label="Created At"
            icon={<IconCalendarCheck />}
            value={new Date().toLocaleString(
              "en-UK",
              {
                hour12: false,
                dateStyle: "medium",
                timeStyle: "short"
              }
            )}
          />

          <FancyInput
            readOnly
            label="Updated At"
            icon={<IconEdit />}
            value={new Date().toLocaleString(
              "en-UK",
              {
                hour12: false,
                dateStyle: "medium",
                timeStyle: "short"
              }
            )}
          />
        </div>

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
            <IconDeviceFloppy
              size={36}
              stroke={1.5}
            />
          </motion.button>
        }
      </Form>
    }
  </Formik>

export default PassphraseDetailsForm