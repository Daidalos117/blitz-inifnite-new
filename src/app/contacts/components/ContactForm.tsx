
import { z } from "zod";
import Form from "@/src/app/components/Form"
import LabeledTextField from "@/src/app/components/LabeledTextField"
import { FormProps } from "react-hook-form"


export function ContactForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  return (
  // @ts-ignore
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <button type="submit">Save</button>
    </Form>
  );
}
