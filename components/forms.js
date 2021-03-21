const { useEffect, useState } = require('react');
import Cookie from 'cookie-universal';
import { fetch } from '../utils/fetch';


const Forms = ({ id }) => {
  const [form, setForm] = useState({});
  const [fields, setFields] = useState({});
  const [alertBar, setAlertBar] = useState({});
  const url = process.env.NEXT_PUBLIC_API_HOST + `/wp-json/contact-form-7/v1/contact-forms/${id}`;
  useEffect(async () => {
    const cookie = Cookie();
    await fetch(url, {
      baseUrl: null,
      headers: {
        Authorization: `Bearer ${cookie.get(process.env.NEXT_PUBLIC_INSTORE_TOKEN)}`
      }
    })
      .then((res) => {
        const newFields = {};
        (res?.properties?.form?.fields || []).filter(field => field.basetype !== 'submit').forEach((field) => {
          newFields[field.name] = field.content;
        })
        setFields(newFields);
        setForm(res);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    Object.keys(fields).forEach((field) => {
      formdata.append(field, fields[field]);
    })
    await fetch(url + '/feedback', {
      baseUrl: null,
      method: 'POST',
      body: formdata
    })
      .then((res) => setAlertBar({ type: res.status.includes('failed') ? 'danger' : 'success', message: res.message }))
  }

  const onChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  const renderAlert = () => {
    if (!alertBar.type) return null;

    return (
      <div className={`alert alert-dismissible alert-${alertBar.type} mt-4`} role="alert">
        {alertBar.message}
        <button type="button" className="close" aria-label="Close" onClick={() => setAlertBar({})}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }

  const renderField = (field, index) => {
    if (field.basetype !== 'textarea') {
      let className = "";
      if (field.basetype == 'submit') {
        className += 'btn btn-outline-dark';
      }

      return (
        <input
          key={index}
          type={field.basetype}
          name={field.name}
          value={field.type === 'submit' ? field.labels[0] : fields[field.name]}
          onChange={onChange}
          className={className}
        />
      );
    }

    return (
      <textarea
        key={index}
        name={field.name}
        value={fields[field.name]}
        onChange={onChange}
      />
    );
  }

  return (
    <form name={form.slug} action={url + '/feedback'} method="POST" onSubmit={onSubmit} className="d-flex flex-column">
      {
        (form?.properties?.form?.fields || []).map((field, index) => {
          let className = '';
          const classOptions = field.options.filter(option => option.includes('class:'));

          if (classOptions != 0) {
            classOptions.forEach((elementClass) => className += `${elementClass.replace('class:', '')} `);
          }

          return (
            <label key={index} className={`d-flex flex-column ${className}`}>
              {field.basetype !== 'submit' && <p>{field.labels[0]}</p>}
              {renderField(field, index)}
            </label>
          )
        })
      }

      {renderAlert()}
    </form>
  );
}

export default Forms;