#!/bin/bash

function create-usecase {
    source_folder=$1
    filename="package.json"
    dockerFilename="docker-compose.yml"

    read -p "Enter the new name for the app: " new_folder_name

    cd "src/widgets"

    rsync -av --exclude 'node_modules/' "$source_folder/" "$new_folder_name/"

    echo "Svelte App created successfully!"

    
    
    cd $new_folder_name && 
    jq --arg old "$source_folder" --arg new "$new_folder_name" 'walk(if type == "string" then gsub($old;$new) else . end)' "$filename" > "$filename.tmp" && 
    mv "$filename.tmp" "$filename"

    create-new-component ${new_folder_name}

    cd ..
    sleep .1
    sed -i '' "s/svelte-sample-app/$new_folder_name/g" "$new_folder_name/$dockerFilename"
}


function create-new-component {
    name=$1
    camelcase_name=$(python -c "import re; print(''.join([i.capitalize() for i in re.split(r'[^\w]+', '${name}')]))")

    mkdir "src/components" && touch "src/components/${name}.svelte" && touch "src/routes/+page.svelte" 
    touch "../../stories/${camelcase_name}.stories.ts"   

    add-component-boilerplate ${name}
    add-page-route ${camelcase_name} ${name}
    add-component-stories ${camelcase_name} ${name}
    
    echo "Svelte Component created successfully!"
}


function add-component-boilerplate {
    component_path=$1

    echo '<script lang="ts">
    // Your code here
</script>

<div>
    <!-- Your HTML content here -->
</div>' >> "src/components/${component_path}.svelte"
}


function add-component-stories {
    component_name=$1
    file_name=$2

    echo 'import type { Meta, StoryObj } from "@storybook/svelte"
import { '${component_name}' } from "$widgets/'${file_name}'";

const meta: Meta<typeof '${component_name}'> = {
	title: "Library/'${component_name}'",
	component: '${component_name}'
};
export default meta;
type Story = StoryObj<typeof '${component_name}'>;

export const Component: Story = {};
' >> "../../stories/${component_name}.stories.ts"
}

function add-page-route {
    camelcase_name=$1
    name=$2

    echo '<script lang="ts">
	import '${camelcase_name}' from "../components/'${name}'.svelte"

</script>

<'${camelcase_name}' />
    ' >> "src/routes/+page.svelte"
}

function install-widgets {
    npm install

    DIR="src/widgets"

    for d in $(find $DIR -type f -name package.json ! -path '*/node_modules/*' -exec dirname {} \;); do
        echo "Running npm install in $d"
        cd "$d" && npm install
        cd ../../..
    done
}

function run-svelte-app {
    app=$1

    cd src/widgets/$app && docker-compose up
}

function clean-svelte-app {
    app=$1

    cd src/widgets/$app && rm -rf node_modules package-lock.json
}

function npm-install {
    app=$1

    cd src/widgets/$app && npm i
}

function npm-build {
    app=$1

    cd src/widgets/$app && npm run build
}

function npm-dev {
    app=$1

    cd src/widgets/$app && npm run dev
}

function npm-start {
    app=$1

    cd src/widgets/$app && npm run start
}

function docker-image {
    app=$1
    cd src/widgets/$app && docker image build -t $app .
}

function docker-run {
    app=$1

    docker container run --rm --name=$app -p 3000:3000 src/widgets/$app
}

function run-storybook {
    if [ -d "node_modules" ]; then
        echo "node_modules directory exists"
        npm run storybook
    else
        echo "node_modules directory does not exist"
        npm install
        npm run storybook
    fi
}

function login-ep {
    if [ -z "${EP_USERNAME}" ] && [ -z "${EP_PASSWORD}" ]; then
        echo "Requesting login in $EPINIO_URL OIDC"
        epinio login --oidc $EPINIO_URL
    else
        echo "Logging in $EPINIO_URL using username: $EP_USERNAME"
        epinio login $EPINIO_URL -u ${EP_USERNAME} -p ${EP_PASSWORD}
    fi
}

function deploy-ep {
    app=$1
    APP_DIR=$(mktemp -d -t $app.XXX)
    EP_APP=${EP_APP:-$app}

    rsync -av "src/widgets/$app/"  "$APP_DIR/" --exclude "node_modules"
    cd $EP_APP && npm install && npm run build && rm -rf node_modules

    epinio push --name $EP_APP -p $APP_DIR
}

function deploy-sb-ep {
    app="violet-ui"
    APP_DIR=$(mktemp -d -t $app.XXX)
    EP_APP=${EP_APP:-$app}

    rsync -av . "$APP_DIR/" --exclude "node_modules"

    cd $APP_DIR && npm install && npm run build && rm -rf node_modules

    epinio app push -n $EP_APP -p $APP_DIR 
}

$*