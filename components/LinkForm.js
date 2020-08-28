import { useForm } from 'react-hook-form';
import { addLink } from '../utils/dbQueries';

export default function LinkForm({ uid }) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ label, link }, e) => {
    try {
      await addLink(uid, label, link);
      e.target.reset();
    } catch (e) {
      console.log(':: e ', e);
      console.log(':: e msg ', e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Label</label>
        <input
          autoFocus
          name="label"
          ref={register({
            required: "Please enter a label"
          })}
          placeholder="My awesome link"
        >
        </input>
        <p>{errors.label && errors.label.message}</p>
      </div>
      <div>
        <label>Link</label>
        <input
          name="link"
          ref={register({
            required: "Please enter a link"
          })}
          placeholder="https://my-link.com"
        >
        </input>
        <p>{errors.link && errors.link.message}</p>
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  )
}
