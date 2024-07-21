import Input from "src/components/Input"
import Select from "src/components/Select"
import Button from "src/components/Button"
import Article from "./styles"

import { useFormik } from "formik"

const EditForm = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values)
    }
  })
  return <Article>
    <h1>Formulário de Edição</h1>
    <form onSubmit={formik.handleSubmit}>
      <section>
        <header>
          <h2>Espécie</h2>
        </header>
        <Select
          formik={formik}
          options={[]}
          name="name"
        />
        <Input
          type="textarea"
          name="description"
          formik={formik}
        />
      </section>
      <section>
        <header>
          <h2>Nomes Populares</h2>
        </header>
        <Select
          formik={formik}
          name="popularNames"
          options={[]}
          creatable
          isMulti
        />
        <Input type="textarea" name="observation" />
      </section>
      <section>
        <header>
          <h2>
            Efeitos Terapêuticos
          </h2>
        </header>
      </section>
      <section>
        <header>
          <h2>
            Metabólios Secundários
          </h2>
          <p>São os metabólitos cmo função terapêuticas identificados nos fitocomplexos</p>
        </header>
      </section>
      <section>
        <header>
          <h2>
            Efeitos Terapêuticos
          </h2>
        </header>
      </section>
      <section>
        <h3>Metabólitos secundários</h3>
        <h3>Sintomas relacionados</h3>
      </section>
      <Button type="submit">Salvar</Button>
    </form>
  </Article>
}

export default EditForm