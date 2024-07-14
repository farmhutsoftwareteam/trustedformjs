# TrustedForm React

An unoffical React package for seamless TrustedForm integration.

## Installation


```bash
npm install trusted-form-react
```



## Usage

```jsx
import { TrustedFormProvider, useTrustedForm } from 'trusted-form-react';
function App() {
return (
<TrustedFormProvider>
<Form />
</TrustedFormProvider>
);
}
function Form() {
const { certUrl, isLoading, error } = useTrustedForm();
if (isLoading) return <p>Loading TrustedForm...</p>;
if (error) return <p>Error: {error.message}</p>;
return (
<form>
{/ Your form fields /}
<input type="hidden" name="trustedform_cert_url" value={certUrl || ''} />
</form>
);
}
```


## API

### TrustedFormProvider

Wrap your app or form component with `TrustedFormProvider`.

Props:
- `config` (optional): Customize TrustedForm settings

### useTrustedForm

Hook to access TrustedForm data within child components.

Returns:
- `certUrl`: The TrustedForm certificate URL
- `isLoading`: Boolean indicating if TrustedForm is still loading
- `error`: Any error that occurred during TrustedForm initialization

## License

Apache License 2.0