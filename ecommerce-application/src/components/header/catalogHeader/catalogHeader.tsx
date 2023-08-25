import { catalogListCreation } from '../../../utils/catalogListCreation';

export default function CatalogHeader() {
  return (
    <header className="header_catalog">
      <ul>{...catalogListCreation()}</ul>
    </header>
  );
}
