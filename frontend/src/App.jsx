import { Admin } from 'react-admin'
import dataProvider from './data/provider'

const App = () => <Admin dataProvider={ dataProvider } />

export default App
