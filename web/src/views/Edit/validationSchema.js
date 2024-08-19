import * as yup from "yup";

const m = {
  MSG_001: "Campo obrigatório",
}

export default yup.object().shape({
  name: yup
    .string()
    .required(m.MSG_001),
  description: yup
    .string()
    .required(m.MSG_001),
  // each prescriptionSuggestions field must have dosage field
  prescriptionSuggestions: yup
    .array()
    .of(
      yup.object().shape({
        description: yup
          .string(),
        dosage: yup
          .string()
          .required(m.MSG_001),
      })
    ),
})