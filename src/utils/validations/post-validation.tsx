import * as Yup from "yup";

export const schemaPost = Yup.object({
  title: Yup.string().min(5, "title min 5 character").required("input a title"),
  body: Yup.string().required("input a body"),
  id: Yup.number()
    .required("input an id number")
    .typeError("input numeric only"),
});
