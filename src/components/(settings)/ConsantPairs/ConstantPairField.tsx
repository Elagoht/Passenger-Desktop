import { IconChevronRight, IconDeviceFloppy, IconTrash, IconX } from "@tabler/icons-react"
import classNames from "classnames"
import { Form, Formik } from "formik"
import { FC } from "react"
import { validationConstantPairForms } from "../../../lib/validations/constantPairForms"
import { ConstantPair } from "../../../types/common"
import Button from "../../form/Button"
import Input from "../../form/Input"

interface IConstantPairProps {
  constant: ConstantPair
  isEditing: boolean
  toggleEditing: () => void
}

const ConstantPairField: FC<IConstantPairProps> = ({ constant, isEditing, toggleEditing }) => {

  return <section>
    <button
      className="flex items-center gap-2 p-3 bg-tuatara-50 dark:bg-tuatara-900 rounded-md w-full text-left"
      onClick={toggleEditing}
    >
      <div className="grid leading-none gap-2 grow">
        <div className="line-clamp-1 text-creamcan-500">
          {constant.key}
        </div>

        <div className="text-tuatara-500 line-clamp-1">
          {constant.value}
        </div>
      </div>

      <IconChevronRight size={24} className={classNames({
        "transition-all duration-300 ease-in-out": true,
        "transform rotate-90": isEditing
      })} />
    </button>

    <div className={classNames({
      "grid gap-2 transition-all duration-300 ease-in-out": true,
      "grid-rows-[0fr]": !isEditing,
      "grid-rows-[1fr]": isEditing
    })}>
      <Formik
        initialValues={constant}
        validationSchema={validationConstantPairForms}
        onSubmit={(values) => { values }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setValues
        }) =>
          <Form className={classNames({
            "px-2 grid gap-2 overflow-hidden transition-all duration-300 ease-in-out": true,
            "py-2 -mb-2": isEditing
          })}>
            <Input
              label="Key"
              name="key"
              value={values.key}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isEditing}
              error={touched.key && errors.key}
            />

            <Input
              label="Value"
              name="value"
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={!isEditing}
              error={touched.value && errors.value}
            />

            <div className="flex gap-2">
              <Button
                color="danger"
                variant="ghost"
                className="px-2.5 w-min"
                disabled={!isEditing}
              >
                <IconTrash size={24} />
              </Button>

              <Button
                color="warning"
                variant="ghost"
                disabled={!isEditing}
                leftIcon={<IconX size={24} />}
                onClick={() => {
                  setValues(constant)
                  toggleEditing()
                }}
              >
                Discard
              </Button>

              <Button
                color="success"
                variant="ghost"
                disabled={!isEditing}
                rightIcon={<IconDeviceFloppy size={24} />}
              >
                Save
              </Button>
            </div>
          </Form>
        }
      </Formik>
    </div>
  </section>
}

export default ConstantPairField
