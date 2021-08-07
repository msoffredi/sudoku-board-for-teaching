import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { SettingsType } from "../../types";
import { setSetting } from "../../actions/settings";
import './Settings.scss';

interface SettingsProps extends SettingsStateToProps {
    setSetting: typeof setSetting;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsState extends SettingsType { }


class SettingsComponent extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);

        this.state = props.settings;
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newState;
        if (e.target.name === "max-errors") {
            newState = Object.assign(this.state, { maxErrors: Number(e.target.value) });
        } else {
            newState = Object.assign(this.state, { [e.target.name]: e.target.checked });
        }

        this.setState(newState);
        this.props.setSetting(newState);
    };

    render(): JSX.Element {
        return (
            <div id="settings">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.hideUsedNumbers}
                                onChange={this.onChange}
                                name="hideUsedNumbers"
                                color="default"
                            />
                        }
                        label="Hide used numbers"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.highlightAreas}
                                onChange={this.onChange}
                                name="highlightAreas"
                                color="default"
                            />
                        }
                        label="Highlight areas"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.highlightIdenticalNumbers}
                                onChange={this.onChange}
                                name="highlightIdenticalNumbers"
                                color="default"
                            />
                        }
                        label="Highlight identical numbers"
                    />
                    <div>
                        <label id="max-errors" htmlFor="max-errors">Max errors: </label>
                        <input
                            name="max-errors"
                            type="text"
                            value={this.state.maxErrors}
                            onChange={this.onChange}
                        />
                    </div>
                </FormGroup>
            </div>
        );
    }
}

interface SettingsStateToProps {
    settings: SettingsType;
}

const mapStateToProps = (store: StoreState): SettingsStateToProps => {
    return {
        settings: store.settings
    };
};

export const Settings = connect(
    mapStateToProps,
    { setSetting }
)(SettingsComponent);
