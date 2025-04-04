import { TestBed } from '@angular/core/testing';

import { TournamentSubmissionFormatterService } from './tournament-submission-formatter.service';

describe('TournamentSubmissionFormatterService', () => {
  let service: TournamentSubmissionFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentSubmissionFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
