import Input from "src/components/Input";
import Button from "src/components/Button";

import Article from "./styles";

import { useMutation } from "@apollo/client";
import { CREATE_SPECIE } from "src/services/api";

import { useFormik } from "formik";
import { Link } from "react-router-dom";

const CreateForm = () => {
  const [createSpecie, { loading: updateSpecieLoading }] = useMutation(CREATE_SPECIE),
    formik = useFormik({
      initialValues: {},
      onSubmit: (values) => {
        createSpecie({ variables: { name: values.name } });
      }
    });

  return (
    <Article>
      <h1>Formulário de Adição</h1>
      <Link to="/edit">Editar Registros</Link>
      <form onSubmit={formik.handleSubmit}>
        <section>
          <header>
            <h2>Espécie</h2>
          </header>
          <Input name="name" label="Nome" formik={formik} />
        </section>
        {/* <pre>
          {JSON.stringify(formik, null, 2)}
        </pre> */}
        <br /><br />
        <Button type="submit" loading={updateSpecieLoading}>Salvar</Button>
      </form>
    </Article>
  );
};

export default CreateForm;
