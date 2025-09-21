function addField() {
        const inputType = document.getElementById("input-type").value;
        const Label = document.getElementById("LabelName").value.trim();
        const form = document.getElementById("form-preview");

        if (!Label) {
          alert("Please enter some input");
          return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "form-field";

        const newLabel = document.createElement("label");
        newLabel.textContent = Label;

        let newInput;

        if (inputType === "text") {
          newInput = document.createElement("input");
          newInput.type = "text";
          newInput.placeholder = Label;
        } else if (inputType === "checkbox") {
          newInput = document.createElement("input");
          newInput.type = "checkbox";
        } else if (inputType === "radio") {
          newInput = document.createElement("input");
          newInput.type = "radio";
          newInput.name = "1";
        }

        wrapper.appendChild(newLabel);
        wrapper.appendChild(newInput);
        form.appendChild(wrapper);

        document.createElement("input-type").value = "";
      }