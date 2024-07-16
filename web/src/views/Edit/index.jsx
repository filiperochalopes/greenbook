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
            <Input
                type="text"
                name="specie.name"
                formik={formik}
            />
            <h3>Nomes Populares</h3>
            <Select
                formik={formik}
                name="popularNames"
                options={[]}
                creatable
                isMulti
                />
                <h4>Descrições</h4>
                <h3>Metabólitos secundários</h3>
                <h4>Sintomas relacionados</h4>
                <h3>Efeitos Terapêuticos</h3>
            <Button type="submit">Salvar</Button>
        </form>
    </article>
}

export default EditForm