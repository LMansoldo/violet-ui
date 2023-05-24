#!/bin/bash

function create-new-component {
    name=$1

    read -p "Enter the new name for the component: " new_component_name

    string_camelcase=$(python -c "import re; print(''.join([i.capitalize() for i in re.split(r'[^\w]+', '${new_component_name}')]))")
    string_lowercase="$(echo ${new_component_name} | sed -e 's/\b\(.\)/\u\1/g' -e 's/ //g')"

    mkdir "src/lib/components/${string_lowercase}" && touch "src/lib/components/${string_lowercase}/${string_lowercase}.svelte" && touch "src/lib/components/${string_lowercase}/index.ts"
    mkdir "src/stories/library" && touch "src/stories/library/${string_camelcase}.stories.ts"   

    add-component-boilerplate ${string_lowercase}
    add-component-index ${string_lowercase} ${string_camelcase}
    add-component-stories ${string_camelcase} ${string_lowercase}
    insert-component-into-index ${string_camelcase} ${string_lowercase}
    
    echo "Svelte Component created successfully!"
}


function add-component-boilerplate {
    component_path=$1

    echo '<script lang="ts">
    // Your code here
</script>

<div>
    <!-- Your HTML content here -->
</div>' >> "src/lib/components/${component_path}/${component_path}.svelte"
}

function add-component-index {
    component_name=$1
    camelcase_name=$2

    echo "export { default as ${camelcase_name} } from './${component_name}.svelte'" >> "src/lib/components/${component_name}/index.ts"
}

function add-component-stories {
    component_name=$1
    file_name=$2

    echo 'import type { Meta, StoryObj } from "@storybook/svelte"
import { '${component_name}' } from "$lib/components/'${file_name}'";

const meta: Meta<typeof Payments> = {
	title: "Library/'${component_name}'",
	component: '${component_name}'
};
export default meta;
type Story = StoryObj<typeof '${component_name}'>;

export const Page: Story = {};
' >> "src/stories/library/${component_name}.stories.ts"
}

function insert-component-into-index {
    component_name=$1
    file_name=$2

    echo "export * from './${file_name}'" >> "src/lib/components/index.ts"
}
$*