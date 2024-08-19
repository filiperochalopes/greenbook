import Input from "src/components/Input";
import Select from "src/components/Select";
import Button from "src/components/Button";
import Article, { StyledOption, StyledControl } from "./styles";
import validationSchema from "./validationSchema";

import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_SPECIES, GET_SPECIE, GET_POPULAR_NAMES, GET_THERAPEUTIC_EFFECTS, GET_METABOLITES, GET_RELEVANCE, GET_PLANT_PARTS, UPDATE_SPECIE } from "src/services/api";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { components } from "react-select";

import { Link } from "react-router-dom";

const EditForm = () => {
  const { data: speciesData, loading: loadingSpecies } = useQuery(GET_SPECIES),
    { data: popularNamesData } = useQuery(GET_POPULAR_NAMES),
    { data: therapeuticEffectsData } = useQuery(GET_THERAPEUTIC_EFFECTS),
    { data: metabolitesData } = useQuery(GET_METABOLITES),
    { data: relevanceData } = useQuery(GET_RELEVANCE),
    { data: plantPartsData } = useQuery(GET_PLANT_PARTS),
    [updateSpecie, { loading: updateSpecieLoading }] = useMutation(UPDATE_SPECIE),
    [specieId, setSpecieId] = useState(null),
    [getSpecie, { data: specieData }] = useLazyQuery(GET_SPECIE, { fetchPolicy: "no-cache" }),
    relevanceMap = {
      low: "Baixa",
      medium: "Media",
      high: "Alta"
    },
    formik = useFormik({
      initialValues: {},
      validationSchema,
      onSubmit: (values) => {
        let data = {
          name: values.name,
          description: values.description,
          popularNames: values.popularNames.map(({ value: p }) => ({ id: p.id, name: p.name, observation: p.observation })),
          therapeuticEffects: values.therapeuticEffects.map(({ value: t }) => ({ id: t.id, term: t.term, meaning: t.meaning, relevance: t.relevance?.value?.level })),
          metabolites: values.metabolites.map(({ value: m }) => ({ id: m.id, name: m.name, description: m.description, relevance: m.relevance?.value?.level })),
          prescriptionSuggestions: values.prescriptionSuggestions.map(p => ({ id: p.id, plantPartId: p.part?.value?.id, description: p.description, dosage: p.dosage })),
        }
        console.log({ id: specieId, ...data })
        updateSpecie({ variables: { id: specieId, ...data } });
        formik.resetForm();
      }
    });

  useEffect(() => {
    if (specieId !== formik.values.specie?.value) {
      console.log(`Capturando dados da espécie id: ${formik.values.specie?.value}...`);
      setSpecieId(formik.values.specie?.value);
      getSpecie({ variables: { id: formik.values.specie?.value } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.specie]);

  useEffect(() => {
    if (specieData) {
      formik.setFieldValue("name", specieData.specie.name, true);
      formik.setFieldTouched("name", true);
      formik.setFieldValue("description", specieData.specie.description, true);
      formik.setFieldTouched("description", true);
      console.log(specieData.specie);
      // cadastra os nomes populares
      formik.setFieldValue(
        "popularNames",
        specieData.specie.popularNames.map((popularName) => ({ label: popularName.name, value: popularName })),
        true
      );
      // cadastra os efeitos terapeuticos
      console.log(specieData.specie.therapeuticEffects);
      formik.setFieldValue(
        "therapeuticEffects",
        specieData.specie.therapeuticEffects.map((therapeuticEffect) => ({ label: therapeuticEffect.term, value: therapeuticEffect })),
        true
      );
      formik.setFieldTouched("therapeuticEffects", true);
      // cadastra os metabólitos
      console.log(specieData.specie);
      const combinedMetabolites = {};

      // Adiciona metabolitos da specieData
      specieData.specie.metabolites.forEach(metabolite => {
        combinedMetabolites[metabolite.name] = {
          ...metabolite,
          relevance: null
        };
      });

      // Adiciona ou atualiza metabolitos com relevância
      specieData.specie.metabolitesRelevance.forEach(metaboliteRelevance => {
        combinedMetabolites[metaboliteRelevance.metabolite.name] = {
          ...metaboliteRelevance.metabolite,
          relevance: {
            label: relevanceMap[metaboliteRelevance.relevance.level],
            value: metaboliteRelevance.relevance
          }
        };
      });

      // Converte o objeto combinado em uma array
      const finalMetabolitesArray = Object.keys(combinedMetabolites).map(name => ({
        label: name,
        value: combinedMetabolites[name]
      }));

      formik.setFieldValue("metabolites", finalMetabolitesArray, true);
      formik.setFieldTouched("metabolites", true);

      // cadastra os efeitos terapêuticos
      const combinedTherapeuticEffects = {};

      specieData.specie.therapeuticEffects.forEach(therapeuticEffect => {
        combinedTherapeuticEffects[therapeuticEffect.term] = {
          ...therapeuticEffect,
          relevance: null
        };
      });

      specieData.specie.therapeuticEffectsRelevance.forEach(therapeuticEffectRelevance => {
        combinedTherapeuticEffects[therapeuticEffectRelevance.therapeuticEffect.term] = {
          ...therapeuticEffectRelevance.therapeuticEffect,
          relevance: {
            label: relevanceMap[therapeuticEffectRelevance.relevance.level],
            value: therapeuticEffectRelevance.relevance
          }
        };
      });

      const finalTherapeuticEffectsArray = Object.keys(combinedTherapeuticEffects).map(term => ({
        label: term,
        value: combinedTherapeuticEffects[term]
      }));

      formik.setFieldValue("therapeuticEffects", finalTherapeuticEffectsArray, true);
      formik.setFieldTouched("therapeuticEffects", true);

      // Adicionando campos de sugestões de prescrições
      let prescriptionSuggestions = specieData.specie.prescriptions ? specieData.specie.prescriptions.map(prescription => ({ ...prescription, part: { label: prescription.part.name, value: prescription.part } })) : [];

      formik.setFieldValue("prescriptionSuggestions", prescriptionSuggestions, true);
      formik.setFieldTouched("prescriptionSuggestions", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specieData]);

  const Option = (props) => {
    return (
      <StyledOption color={props.value.hexColor}>
        <components.Option {...props} />
      </StyledOption>
    );
  };

  const SingleValue = ({
    children,
    ...props
  }) => {
    return (
      <StyledControl color={props.data.value.hexColor}>
        <components.SingleValue {...props}>{children}</components.SingleValue>
      </StyledControl>
    );
  }

  return (
    <Article>
      <h1>Formulário de Edição</h1>
      <Link to="/add">Adicionar espécie</Link>
      <form onSubmit={formik.handleSubmit}>
        <section>
          <header>
            <h2>Espécie</h2>
          </header>
          <Select
            formik={formik}
            options={speciesData ? speciesData.species.map((specie) => ({ label: specie.name, value: specie.id })) : []}
            name="specie"
            loading={loadingSpecies}
          />
          {formik.values.name && <><Input name="name" label="Nome" formik={formik} />
            <Input type="textarea" name="description" label="Descrição" formik={formik} /></>}
        </section>
        {formik.values.name && <>
          <section>
            <header>
              <h2>Nomes Populares</h2>
            </header>
            <Select
              formik={formik}
              name="popularNames"
              options={popularNamesData ? popularNamesData.popularNames?.map((popularName) => ({ label: popularName.name, value: { id: popularName.id, name: popularName.name, observation: popularName.observation } })) : []}
              creatable
              isMulti
            />
            {formik.values.popularNames?.length > 0 && formik.values.popularNames?.map((popularName, i) => (
              <div key={popularName.value.name || popularName.value}>
                <h3>{popularName.value.name || popularName.value}</h3>
                <Input
                  type="textarea"
                  name={`popularNames.${i}.value.observation`}
                  label="Observações"
                  formik={formik}
                />
              </div>
            ))}
          </section>
          <section>
            <header>
              <h2>Efeitos Terapêuticos</h2>
            </header>
            <Select
              formik={formik}
              name="therapeuticEffects"
              options={therapeuticEffectsData ? therapeuticEffectsData.therapeuticEffects.map((therapeuticEffect) => ({
                label: therapeuticEffect.term, value: {
                  id: therapeuticEffect.id,
                  term: therapeuticEffect.term, meaning: therapeuticEffect.meaning
                }
              })) : []}
              isMulti
              creatable
              onCreateTerm="term"
            />
            {formik.values.therapeuticEffects?.map((therapeuticEffect, i) => (
              <div key={therapeuticEffect.value.term}>
                <h3>{therapeuticEffect.value.term}</h3>
                <Input
                  type="textarea"
                  name={`therapeuticEffects.${i}.value.meaning`}
                  label="Definição"
                  formik={formik}
                />
                <Select
                  formik={formik}
                  name={`therapeuticEffects.${i}.value.relevance`}
                  components={{ Option, SingleValue }}
                  label="Relevância"
                  options={relevanceData && relevanceData.relevance.map((relevance) => ({
                    label: relevanceMap[relevance.level], value: relevance
                  }))}
                />
                <hr />
              </div>
            ))}
          </section>
          <section>
            <header>
              <h2>Metabólios Secundários</h2>
              <p>São os metabólitos com função terapêuticas identificados nos fitocomplexos</p>
            </header>
            <Select
              formik={formik}
              name="metabolites"
              options={metabolitesData ? metabolitesData.metabolites.map((metabolite) => ({ label: metabolite.name, value: { id: metabolite.id, name: metabolite.name, description: metabolite.description } })) : []}
              isMulti
              creatable
            />
            {formik.values.metabolites?.map((metabolite, i) => (
              <div key={metabolite.value.name}>
                <h3>{metabolite.value.name}</h3>
                <Input
                  type="textarea"
                  name={`metabolites.${i}.value.description`}
                  label="Descrição"
                  formik={formik}
                />
                <Select
                  formik={formik}
                  name={`metabolites.${i}.value.relevance`}
                  components={{ Option, SingleValue }}
                  label="Relevância"
                  options={relevanceData && relevanceData.relevance.map((relevance) => ({
                    label: relevanceMap[relevance.level], value: relevance
                  }))}
                />
                <hr />
              </div>
            ))}
          </section>
          <section>
            <header>
              <h2>Sugestões de Prescrição</h2>
              <p>Anotações de sugestões de prescrições sugeridas</p>
            </header>
            {formik.values.prescriptionSuggestions?.length && formik.values.prescriptionSuggestions.map((_, index) => <div key={index}><Select
              formik={formik}
              name={`prescriptionSuggestions.${index}.part`}
              options={plantPartsData ? plantPartsData.plantParts?.map((part) => ({ label: part.name, value: part })) : []}
            />
              <Input
                type="textarea"
                name={`prescriptionSuggestions.${index}.dosage`}
                label="Dosagem"
                formik={formik}
              />
              <Input
                type="textarea"
                name={`prescriptionSuggestions.${index}.description`}
                label="Descrição"
                formik={formik}
              />
              {/* Caso não tenha id, mostrar botão para remover */}
              {!formik.values.prescriptionSuggestions[index].id && <Button
                onClick={() => formik.setFieldValue('prescriptionSuggestions', formik.values.prescriptionSuggestions.filter((_, i) => i !== index))}
              >
                Remover
              </Button>}
              <hr />
            </div>
            )}
            <Button onClick={() => formik.setFieldValue('prescriptionSuggestions', [...formik.values.prescriptionSuggestions, {} ])}>Adicionar Prescrição</Button>
          </section>
        </>
        }
        {/* <pre>
          {JSON.stringify(formik, null, 2)}
        </pre> */}
        <br /><br />
        <Button type="submit" loading={updateSpecieLoading}>Salvar</Button>
      </form>
    </Article>
  );
};

export default EditForm;
