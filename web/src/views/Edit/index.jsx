import Input from "src/components/Input"
import Select from "src/components/Select"
import Button from "src/components/Button"

const EditForm = () => {
    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            console.log(values)
        }
    })
    return <article>
        <h2>Formulário de Edição</h2>
        <form onSubmit={formik.handleSubmit}>
        <section>
        <header>
            <h2>Espécie</h2>
            </header>
            <Select
             formik={forimk}
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
                <Input type="textarea" name="observation"/>
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
                <h3>Metabólitos secundários</h3>
                <h4>Sintomas relacionados</h4>
                <h3>Efeitos Terapêuticos</h3>
            <Button type="submit">Salvar</Button>
        </form>
    </article>
}

export default EditForm