<script lang="ts">
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import { Button } from "$violet/components";
  </script>
  
  <Meta title="Library/Common/Button" component={Button} tags="autodocs" />
  
  <Template let:args>
    <Button {...args} isLoading={true}><div>Click</div></Button>
  </Template>
  
  <Story name="Default" />
  