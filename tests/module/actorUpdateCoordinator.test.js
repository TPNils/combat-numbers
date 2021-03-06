import ActorUpdateCoordinator from 'module/actorUpdateCoordinator';
import Renderer from '../../src/module/renderer';
import SocketController from '../../src/module/socketController';

let mockRenderer;
let mockSocketController;
let mockCalculator;
let mockState;
let coordinator;

beforeEach(() => {
  mockRenderer = {};
  mockSocketController = {};
  mockCalculator = {};
  mockState = {};
  coordinator = new ActorUpdateCoordinator(
    mockRenderer,
    mockSocketController,
    mockCalculator,
    mockState,
  );
});

it('should return void if the HP diff finding throw an exception', () => {
  const mockEntity = {};
  const mockDelta = {};

  mockCalculator.getHpDiff = () => {
    throw new Error();
  };
  mockCalculator.getCoordinates = jest.fn();

  coordinator.coordinatePreUpdate(mockEntity, mockDelta, [], {});

  expect(mockCalculator.getCoordinates).not.toHaveBeenCalled();
});

it('should return void if the HP diff is zero', () => {
  const mockEntity = {};
  const mockDelta = {};

  mockCalculator.getHpDiff = () => 0;
  mockCalculator.getCoordinates = jest.fn();

  coordinator.coordinatePreUpdate(mockEntity, mockDelta, [], {});

  expect(mockCalculator.getCoordinates).not.toHaveBeenCalled();
});

it('should process and render and emit to the socket controller if we are using mask', () => {
  const mockEntity = {};
  const mockDelta = {};
  const mockScene = { _id: 1234 };

  mockCalculator.getHpDiff = () => 5;
  mockCalculator.getCoordinates = () => ({ x: 1, y: 2 });

  mockState.getIsMask = () => true;
  mockRenderer.processMaskedAndRender = jest.fn();
  mockSocketController.emit = jest.fn();

  coordinator.coordinatePreUpdate(mockEntity, mockDelta, [{}], mockScene);

  expect(mockRenderer.processMaskedAndRender).toHaveBeenCalledWith(
    Renderer.maskedTypes.TYPE_HEAL,
    1,
    2,
  );
  expect(mockSocketController.emit).toHaveBeenCalledWith(
    Renderer.maskedTypes.TYPE_HEAL,
    SocketController.emitTypes.TYPE_MASKED,
    1,
    2,
    1234,
  );
});

it('should process and render and emit to the socket controller if we are using numeric', () => {
  const mockEntity = {};
  const mockDelta = {};
  const mockScene = { _id: 1234 };

  mockCalculator.getHpDiff = () => 5;
  mockCalculator.getCoordinates = () => ({ x: 1, y: 2 });

  mockState.getIsMask = () => false;
  mockRenderer.processNumericAndRender = jest.fn();
  mockSocketController.emit = jest.fn();

  coordinator.coordinatePreUpdate(mockEntity, mockDelta, [{}], mockScene);

  expect(mockRenderer.processNumericAndRender).toHaveBeenCalledWith(
    5,
    1,
    2,
  );
  expect(mockSocketController.emit).toHaveBeenCalledWith(
    5,
    SocketController.emitTypes.TYPE_NUMERIC,
    1,
    2,
    1234,
  );
});
