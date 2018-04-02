import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import charactersActions from 'actions/characters';
import SearchInput from './components/SearchInput';
import CharactersList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';
import Paginate from './components/Paginate';
import { getCharacters } from 'apis';
import styles from './index.module.scss';

class Characters extends Component {
	static propTypes = {
	   characters: PropTypes.array,
       charactersById: PropTypes.object,
	};

    constructor(props) {
        super(props);

        this.state = {
            isFetchingData: false,
            searchInput: '',
            selectedCharacterId: null,
            paginate: {
                offset: 0,
                limit: 18,
                total: 0,
                count: 0,
            }
        };

        this.getCharacters = _.debounce(this.getCharacters, 500);
        this.lastRequest = null;
    }

	handleSearchInputChange = ({ value }) => {
        const { actions } = this.props;
        
        this.setState({ isFetchingData: value ? true : false, searchInput: value });

        if (!value) {
            actions.setCharacters({ characters: [] });
            return;
        }

        this.getCharacters();
    };

    getCharacters = () => {
        const { actions } = this.props;
        const { searchInput, paginate } = this.state;
        
        if (this.lastRequest) {
            this.lastRequest.abort();
        }

        const name = searchInput;
        const offset = paginate.offset;
        const limit = paginate.limit;

        this.lastRequest = getCharacters({ name, offset, limit })
                .end((error, response) => {
                    this.setState({ isFetchingData: false });
                    
                    /* TODO: Handle error case */
                    if (error)
                        return;

                    const { offset, limit, total, count } = _.get(response, 'body.data');

                    this.setPaginateState({ offset, limit, total, count });
                    
                    actions.setCharacters({
                        characters: _.get(response, 'body.data.results')
                    });
                });
    };

    handleCharacterSelected = ({ id }) => {
        this.setState({ selectedCharacterId: id });
    };

    handleCharacterDetailsClose = () => {
        this.setState({ selectedCharacterId: null });
    };

    setPaginateState = (updates, callback) => {
        const paginate = { ...this.state.paginate, ...updates };
        this.setState({ paginate }, callback);
    };

    handlePageChange = ({ offset }) => {
        window.scrollTo(0,0);
        this.setPaginateState({ offset }, () => {
            this.setState({ isFetchingData: true, selectedCharacterId: null });
            this.getCharacters();
        });
    };
    
    render() {
        const { characters } = this.props;
        return (
            <div className={styles.container}>
                <SearchInput
            		onChange={this.handleSearchInputChange}
                    searchInput={this.state.searchInput}
            	/>

                <CharactersList
                    characters={characters}
                    searchInput={this.state.searchInput}
                    isFetchingData={this.state.isFetchingData}
                    onCharacterSelected={this.handleCharacterSelected}
                    totalCharacters={this.state.paginate.total}
                />

                <CharacterDetails 
                    character={_.find(characters, { id: this.state.selectedCharacterId })}
                    onClose={this.handleCharacterDetailsClose}
                />

                {
                    !this.state.isFetchingData && _.size(characters) ? (
                        <Paginate 
                            {...this.state.paginate}
                            onChange={this.handlePageChange}
                        />
                    ) : null
                }
            </div>
        );
    }
}


function mapStateToProps({ characters }) {
    return {
        characters: characters.characters,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(charactersActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Characters);

