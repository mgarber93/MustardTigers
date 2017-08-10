import React from 'react';
import ClanSearchEntry from './ClanSearchEntry.jsx';
class ClanSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let searchResults = this.props.clan.map((clan, i) => {
      return <ClanSearchEntry clan={clan} key={i} />
    });

    return (
      <div>
        hello
      </div>
    )
  }
}

export default ClanSearch;