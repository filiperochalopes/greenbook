import Input from "src/components/Input"
import Select from "src/components/Select"
import Button from "src/components/Button"
import Article from "./styles"

import { useQuery, useLazyQuery } from "@apollo/client"
import { GET_SPECIES, GET_SPECIE, GET_POPULAR_NAMES } from "src/services/api"

import { useFormik } from "formik"
import { useEffect, useState } from "react"

const EditForm = () => {
  const {data:speciesData, loading:loadingSpecies} = useQuery(GET_SPECIES),
  {data:popularNamesData} = useQuery(GET_POPULAR_NAMES),
  [specieId, setSpecieId] = useState(null),
  [popularNames, setPopularNames] = useState(null),
  [therapeuticEffects, setTheraputicEffects] = useState(null),
  [metabolites, setMetabolites] = useState(null),
    [getSpecie, {data:specieData}] = useLazyQuery(GET_SPECIE),
    [specie, setSpecie] = useState({}),
  formik = useFormik({
    initialValues: {
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    if (specieId !== formik.values.specie?.value) {
      setSpecieId(formik.values.specie?.value)
      getSpecie({variables: {id: formik.values.specie?.value}})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.specie])

  useEffect(() => {
    if (specieData) {
      formik.setFieldValue("description", specieData.specie.description, true)
      formik.setFieldTouched("description", true)
      console.log(specieData.specie)
      // cadastra os nomes populares
      formik.setFieldValue("popularNames", specieData.specie.popularNames.map((popularName) => ({label: popularName.name, value: popularName})), true)
      // cadastra os efeitos terapeuticos
      // cadastra os metabólitos
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specieData])

  return <Article>
    <h1>Formulário de Edição</h1>
    <form onSubmit={formik.handleSubmit}>
      <section>
        <header>
          <h2>Espécie</h2>
        </header>
        <Select
          formik={formik}
          options={speciesData ? speciesData.species.map((specie) => ({label: specie.name, value: specie.id})) : []}
          name="specie"
          loading={loadingSpecies}
        />
        <Input
          type="textarea"
          name="description"
          label="Descrição"
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
          options={popularNamesData ? popularNamesData.popularNames?.map((popularName) => ({label: popularName.name, value: {id: popularName.id, name: popularName.name, observation: popularName.observation}})) : []}
          creatable
          isMulti
        />
        {formik.values.popularNames?.map((popularName, i) => (
          <>
          <h3>{popularName.value.name || popularName.value}</h3>
          <input type="text" value={popularName.value.id} />
          <Input
            type="textarea"
            name={`popularNames.${i}.value.observation`}
            label="Observações"
            formik={formik}
          />
          </>
        ))}
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
        <h3>Sintomas relacionados</h3>
      </section>
      <pre>
        {JSON.stringify(formik, null, 2)}
      </pre>
      <Button type="submit">Salvar</Button>
    </form>
  </Article>
}

export default EditForm