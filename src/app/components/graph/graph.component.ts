import {Component, AfterViewInit, OnInit} from '@angular/core';
import cytoscape from 'cytoscape';
import {AiService} from "../../services/ai/ai.service";
import {Agent} from "../../model/agent";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent implements OnInit, AfterViewInit {
  agents: Agent[] = [];
  genres: string[] | undefined = [];

  constructor(private aiService: AiService) {
  }

  ngOnInit(): void {
    this.agents = this.aiService.matchedAgents;
    this.genres = localStorage.getItem('book')?.split(',').map(genre => genre.trim());
    //console.log('Agents in GraphComponent:', this.agents);
  }

  ngAfterViewInit(): void {
    //console.log('Agents:', this.agents);
    console.log('Genres:', this.genres);
    const nodes = this.agents.map((agent, index) => ({
      data: {
        id: `agent${index}`,
        label: agent.name,
        genres: agent.genres,
        profile_link: agent.profileLink
      }
    }));
    nodes.push({data: {id: 'user', label: 'You', genres: '-', profile_link: '-'}});
    console.log('Nodes:', nodes);

    const edges=[];
    for (let i = 0; i < 5; i++) {
      edges.push({data: {source: `user`, target: `agent${i}`}})
    }

    for (let i = 0; i < this.agents.length; i++) {
      let conection_count= new Array(20).fill(0);

      for (let j = i + 1; j < this.agents.length; j++) {
        let genresA = this.agents[i].genres.split(',').map(genre => genre.trim());
        let genresB = this.agents[j].genres.split(',').map(genre => genre.trim());

        genresA=  genresA.filter(genre => !(this.genres ?? []).includes(genre));
        genresB=  genresB.filter(genre => !(this.genres ?? []).includes(genre));
        // genresB = genresB.filter(genre => !this.genres?.includes(genre));

        const commonGenres = genresA.filter(genre => genresB.includes(genre));

        if (commonGenres.length > 0 && conection_count[i]<3 && conection_count[j]<3) {
          conection_count[i]++;
          conection_count[j]++;
          console.log(`Common genres between agent ${this.agents[i]} and agent ${this.agents[j]}:`, commonGenres);
          edges.push({
            data: {
              id: `edge${i}-${j}`,
              source: `agent${i}`,
              target: `agent${j}`,
              label: commonGenres.join(', ')
            }
          });
        }
      }
    }

    cytoscape({
      container: document.getElementById('cy')!,
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'background-color': '#4FC3F7',
            'color': '#000',
            'text-valign': 'center',
            'text-halign': 'center',
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
          },
        },
      ],
      layout: {
        name: 'cose',
        animate: true,
      },
    } as cytoscape.CytoscapeOptions);

  }
}
