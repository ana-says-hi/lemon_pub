import { TestBed } from '@angular/core/testing';

import { PeopleServiceService } from './people-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../../model/user";

describe('PeopleServiceService', () => {
  let service: PeopleServiceService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    new User(
      1, 'alice@example.com', 'alice', 'Alice', 'Smith', '123456789', true, 'admin', 'pass123'
    ),
    new User(
      2, 'bob@example.com', 'bob', 'Bob', 'Jones', '987654321', false, 'user', 'pass456'
    )
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PeopleServiceService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne('http://localhost:3532/api/peeps');
    req.flush(mockUsers);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get users on init', () => {
    // const req = httpMock.expectOne('http://localhost:3532/api/peeps');
    // expect(req.request.method).toBe('GET');
    // req.flush(mockUsers);the backend
    expect(service.users.length).toBe(2);
    expect(service.users[0].email).toBe('alice@example.com');
  });

  it('should get users from API', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users[1].username).toBe('bob');
    });

    const req = httpMock.expectOne('http://localhost:3532/api/peeps');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should get user by email', () => {
    const email = 'alice@example.com';
    service.getUserByEmail(email).subscribe(user => {
      expect(user.email).toBe(email);
      expect(user.first_name).toBe('Alice');
    });

    const req = httpMock.expectOne(`http://localhost:3532/api/peeps/${email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers[0]);
  });


  it('should return null if username not found', () => {
    service.users = mockUsers;
    const user = service.getUserByUsername('unknown');
    expect(user).toBeNull();
  });

  it('should add new user', () => {
    const newUser = new User(
      3, 'charlie@example.com', 'charlie', 'Charlie', 'Brown', '555000111', true, 'user', 'secret'
    );

    service.addUser(newUser).subscribe(user => {
      expect(user.email).toBe('charlie@example.com');
      expect(user.username).toBe('charlie');
    });

    const req = httpMock.expectOne('http://localhost:3532/api/peeps');
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
