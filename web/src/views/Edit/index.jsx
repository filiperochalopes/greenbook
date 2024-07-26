import Input from "src/components/Input"
import Select from "src/components/Select"
import Button from "src/components/Button"
import Article from "./styles"

import { useQuery, useLazyQuery } from "@apollo/client"
import { GET_SPECIES, GET_SPECIE } from "src/services/api"

import { useFormik } from "formik"
import { useEffect, useState } from "react"

const EditForm = () => {
  const {data:speciesData, loading:loadingSpecies} = useQuery(GET_SPECIES),
  [specieId, setSpecieId] = useState(null),
    [getSpecie, {data:specieData}] = useLazyQuery(GET_SPECIE),
    [specie, setSpecie] = useState({}),
  formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    if (speciesData) {
      console.log(speciesData)
    }
  }, [speciesData])

  useEffect(() => {
    if (specieId !== formik.values.specieId) {
      setSpecieId(formik.values.specieId)
      getSpecie({variables: {id: formik.values.specieId}})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.specieId])

  useEffect(() => {
    if (specieData) {
      console.log(specieData.specie)
      setSpecie(specieData.specie)
    }
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
          name="specieId"
          loading={loadingSpecies}
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
        {specie.popularNames?.map((popularName) => (
          <>
          <h3>{popularName.name}</h3>
          <Input
            type="textarea"
            name="popularName"
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