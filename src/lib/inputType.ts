import EmailInput from "../components/contact/inputComponents/EmailInput.astro";
import TextareaInput from "../components/contact/inputComponents/TextareaInput.astro";
import TextInput from "../components/contact/inputComponents/TextInput.astro";

export enum InputTypes {
  INPUT_TEXT = "text",
  INPUT_EMAIL = "email",
  INPUT_TEXTAREA = "textarea",
}

export const inputTypes: Record<string, any> = {
  [InputTypes.INPUT_TEXT]: TextInput,
  [InputTypes.INPUT_EMAIL]: EmailInput,
  [InputTypes.INPUT_TEXTAREA]: TextareaInput,
};

export function mapInputTypeToInputComponent(inputType: string) {
  const componentToDisplay = inputTypes[inputType];

  return componentToDisplay;
}
