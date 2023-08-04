"use client";

import React, { use } from "react";
import { Hit as AlgoliaHit } from "instantsearch.js";
import {
  DynamicWidgets,
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  SearchBox,
  InstantSearchSSRProvider,
  InstantSearchServerState,
} from "react-instantsearch-hooks-web";
import { renderToString } from "react-dom/server";
import { getServerState } from "react-instantsearch-hooks-server";

import { Panel } from "@/components/Panel";

import { searchClient } from "@/utils/typesenseSearchClient";

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

type SearchPageProps = {
  serverState?: InstantSearchServerState;
};

function Search({ serverState }: SearchPageProps) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="products"
        insights={true}
      >
        <div className="Container">
          <div className="Sidebar">
            <DynamicWidgets fallbackComponent={FallbackComponent} />
          </div>
          <div className="MainContent">
            <SearchBox />
            <Hits hitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}

export default function SearchPage() {
  const serverState = use(
    getServerState(<Search />, {
      renderToString,
    })
  );

  return <Search serverState={serverState} />;
}
