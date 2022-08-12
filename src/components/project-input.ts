import Component from './base-component.js';
import * as Validatable from '../util/validation.js';
import { autobind as Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';

// ProjectInput class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descritpionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descritpionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descritpionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validatable.validate(titleValidatable) ||
      !Validatable.validate(descriptionValidatable) ||
      !Validatable.validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descritpionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
