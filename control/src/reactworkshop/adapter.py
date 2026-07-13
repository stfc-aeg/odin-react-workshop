from odin_control.adapters.adapter import ApiAdapter
from .controller import ReactWorkshopController, ReactWorkshopError


class ReactWorkshopAdapter(ApiAdapter):
    """ReactWorkshop Adapter class inheriting base adapter functionality."""

    controller_cls = ReactWorkshopController
    error_cls = ReactWorkshopError
