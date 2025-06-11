import {TestBed} from '@angular/core/testing';

import {FilesServiceService} from './files-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserFile} from "../../model/user_file";

describe('UserFilesServiceService', () => {
  let service: FilesServiceService;
  let httpMock: HttpTestingController;

  const mockFile = new UserFile(
    'test@example.com',
    'Test Book',
    true,
    'Test description',
    'pdf',
    ['Fantasy', 'Adventure']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FilesServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all user files', () => {
    service.getFiles().subscribe(files => {
      expect(files.length).toBe(1);
      expect(files[0].book_title).toBe('Test Book');
      expect(files[0].genres).toEqual(['Fantasy', 'Adventure']);
    });
    const req = httpMock.expectOne('http://localhost:3532/api/user_files');
    expect(req.request.method).toBe('GET');
    req.flush([mockFile]);
  });

  it('should fetch files by user email', () => {
    service.getFileByUserEmail('test@example.com').subscribe(files => {
      expect(files.length).toBe(1);
      expect(files[0].userEmail).toBe('test@example.com');
    });

    const req = httpMock.expectOne('http://localhost:3532/api/user_files/test@example.com');
    expect(req.request.method).toBe('GET');
    req.flush([mockFile]);
  });

  it('should add a new file', () => {
    service.addFile(mockFile).subscribe(file => {
      expect(file.book_title).toBe('Test Book');
      expect(file.file_type).toBe('pdf');
    });

    const req = httpMock.expectOne('http://localhost:3532/api/user_files');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.book_title).toBe('Test Book');
    req.flush(mockFile);
  });

  it('should update a file', () => {
    const id = `${mockFile.book_title}_${mockFile.userEmail}`;

    service.updateFile(mockFile).subscribe(file => {
      expect(file.book_title).toBe('Test Book');
    });

    const req = httpMock.expectOne(`http://localhost:3532/api/user_files/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.userEmail).toBe(mockFile.userEmail);
    req.flush(mockFile);
  });

  it('should update file genres', () => {
    const updatedGenres = ['Sci-Fi', 'Mystery'];
    const id = `${mockFile.book_title}_${mockFile.userEmail}`;

    service.updateFileGenres(mockFile, updatedGenres).subscribe(file => {
      expect(file.genres).toEqual(updatedGenres);
    });

    const req = httpMock.expectOne(`http://localhost:3532/api/user_files/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.genres).toEqual(updatedGenres);
    req.flush({...mockFile, genres: updatedGenres});
  });
});
