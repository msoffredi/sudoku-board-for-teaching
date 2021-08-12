import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { SettingsType } from "../../types";
import { setSettings } from "../../actions";
import './Settings.scss';
import { PageContainer } from "../PageContainer/PageContainer";

interface SettingsProps extends SettingsStateToProps {
    closeEvent: () => void;
    setSettings: typeof setSettings;
}

interface SettingsState {
    settings: SettingsType;
    open: boolean;
}

class SettingsComponent extends React.Component<SettingsProps, SettingsState> {
    settingsRef: React.RefObject<HTMLDivElement>;

    constructor(props: SettingsProps) {
        super(props);

        this.state = {
            settings: props.settings,
            open: false
        };

        this.settingsRef = React.createRef();
    }

    closePage = (event: Event): void => {
        // This avoids the first trigger when we clicked on the menu
        if (this.state.open
            && !this.settingsRef.current?.contains(event.target as Node)) {

            this.props.closeEvent();
        } else {
            this.setState({ open: true });
        }
    };

    componentDidMount(): void {
        document.body.addEventListener('click', this.closePage);
    }

    componentWillUnmount(): void {
        document.body.removeEventListener('click', this.closePage);
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const settings = this.state.settings;
        let newState;

        if (e.target.name === "max-errors") {
            newState = Object.assign(settings, { maxErrors: Number(e.target.value) });
        } else {
            newState = Object.assign(settings, { [e.target.name]: e.target.checked });
        }

        this.setState({ settings: newState });
        this.props.setSettings(newState);
    };

    render(): JSX.Element {
        const {
            hideUsedNumbers,
            highlightAreas,
            highlightIdenticalNumbers,
            maxErrors
        } = this.state.settings;

        return (
            <PageContainer>
                <div className="container-center">
                    <div id="settings" ref={this.settingsRef}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={hideUsedNumbers}
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
                                        checked={highlightAreas}
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
                                        checked={highlightIdenticalNumbers}
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
                                    value={maxErrors}
                                    onChange={this.onChange}
                                />
                            </div>
                        </FormGroup>
                    </div>
                </div>
            </PageContainer>
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
    { setSettings }
)(SettingsComponent);
