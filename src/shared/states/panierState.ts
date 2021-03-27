import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store'
import { removeItem } from '@ngxs/store/operators'
import { AddReference, DelReference } from "../actions/panier.action";
import { PanierStateModel } from "./panierStateModel";

@State<PanierStateModel>({
    name: 'panier',
    defaults: {
        panier: []
    }
})
@Injectable()
export class PanierState {

    @Selector()
    static getNbReferences(state: PanierStateModel) {
        return state.panier.length;
    }

    @Action(AddReference) add(
        { getState, patchState }: StateContext<PanierStateModel>, 
        { payload }: AddReference) {
            console.log(payload);
            const state = getState();
            patchState({ panier: [...state.panier, payload] });
        }
    

    @Action(DelReference) del(
        { getState, patchState }: StateContext<PanierStateModel>, 
        { payload }: DelReference) {
            const state = getState();
            let index = state.panier.findIndex(x => x.id == payload.id);
            state.panier.splice(index, 1);
            patchState({ panier: state.panier });
        }
}