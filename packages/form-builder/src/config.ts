import { IFormBuilder, TFormConfig } from "./typesFormBuilder";

export const FORM_CONFIG: TFormConfig = {
  element: "div",
  attrs: {},
  elements: [
    {
      element: "div",
      attrs: {},
      elements: [
        {
          element: "input",
          label: "First Name",
          attrs: {
            id: "first_name",
            name: "first_name",
            value: "",
            type: "text",
          },
        },
        {
          element: "input",
          label: "Last Name",
          attrs: {
            id: "last_name",
            name: "last_name",
            value: "",
            type: "text",
          },
        },
      ],
    },
    {
      element: "div",
      attrs: {},
      elements: [
        {
          element: "label",
          label: "Gender",
          elements: [],
        },
        {
          element: "div",
          attrs: {},
          elements: [
            {
              element: "input",
              label: "Male",
              attrs: {
                type: "radio",
                value: "male",
                name: "gender",
                id: "male",
              },
            },
            {
              element: "input",
              label: "Female",

              attrs: {
                type: "radio",
                value: "female",
                name: "gender",
                id: "female",
              },
            },
          ],
        },
      ],
    },
    {
      element: "div",
      attrs: {},
      elements: [
        {
          element: "label",
          label: "Pick Your Sports",
          elements: [],
        },
        {
          element: "div",
          attrs: {},
          elements: [
            {
              element: "input",
              label: "Volleyball",
              attrs: {
                type: "checkbox",
                value: "volleyball",
                name: "sports",
                id: "sports_volleyball",
              },
            },
            {
              element: "input",
              label: "Basketball",
              attrs: {
                type: "checkbox",
                value: "basketball",
                name: "sports",
                id: "sports_basketball",
              },
            },
          ],
        },
      ],
    },
    {
      element: "select",
      label: "Choose a pet",
      attrs: { name: "pet", id: "pet" },
      options: [
        { label: "", value: "--Please choose an option--" },
        { label: "Dog", value: "dog" },
        { label: "Cat", value: "cat" },
        { label: "Hamster", value: "hamster" },
        { label: "Parrot", value: "parrot" },
        { label: "Spider", value: "spider" },
        { label: "Goldfish", value: "goldfish" },
      ],
    },
    {
      element: "textarea",
      label: "Description",
      attrs: { rows: 5, name: "description", id: "description" },
    },
    {
      element: "input",
      label: "",
      attrs: {
        type: "submit",
        value: "Submit Form",
      },
    },
  ],
};
